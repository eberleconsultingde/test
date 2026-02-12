const FAKE_EMAIL = "example@example.com";
const SIGNATURE = "\n\n—\nSent via Mailto Generator";

const modeInputs = document.querySelectorAll('input[name="mode"]');
const toInput = document.getElementById("to");
const toError = document.getElementById("to-error");
const subjectInput = document.getElementById("subject");
const bodyInput = document.getElementById("body");
const ccInput = document.getElementById("cc");
const bccInput = document.getElementById("bcc");
const signatureInput = document.getElementById("signature");
const privacyWarning = document.getElementById("privacy-warning");
const preview = document.getElementById("mailto-preview");
const snippetPreview = document.getElementById("snippet-preview");
const copyBtn = document.getElementById("copy");
const openBtn = document.getElementById("open");
const resetBtn = document.getElementById("reset");
const presetBtns = document.querySelectorAll(".preset-btn");

function buildMailto({ to, subject, body, cc, bcc }) {
  const recipient = (to || "").trim();
  const params = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  if (cc) {
    params.push(`cc=${encodeURIComponent(cc)}`);
  }
  if (bcc) {
    params.push(`bcc=${encodeURIComponent(bcc)}`);
  }

  return `mailto:${recipient}${params.length ? `?${params.join("&")}` : ""}`;
}

function buildHtmlSnippet(mailtoUrl) {
  const escapedHref = mailtoUrl.replace(/&/g, "&amp;");
  return `<a href="${escapedHref}">Email us</a>`;
}

function getMode() {
  return [...modeInputs].find((input) => input.checked)?.value || "privacy";
}

function isSimpleValidEmail(email) {
  if (email.includes(" ")) return false;
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return false;
  const dotAfterAt = email.indexOf(".", atIndex + 2);
  return dotAfterAt > atIndex + 1 && dotAfterAt < email.length - 1;
}

function getToValueByMode() {
  const mode = getMode();
  if (mode === "privacy") {
    return FAKE_EMAIL;
  }
  return toInput.value.trim();
}

function getBodyWithOptionalSignature() {
  const body = bodyInput.value;
  if (!signatureInput.checked) {
    return body;
  }
  if (body.endsWith(SIGNATURE)) {
    return body;
  }
  return `${body}${SIGNATURE}`;
}

function render() {
  const mode = getMode();
  const isPrivacyMode = mode === "privacy";

  privacyWarning.hidden = !isPrivacyMode;
  toInput.disabled = isPrivacyMode;
  if (isPrivacyMode) {
    toInput.value = FAKE_EMAIL;
    toError.textContent = "";
  }

  const to = getToValueByMode();
  if (!isPrivacyMode && to && !isSimpleValidEmail(to)) {
    toError.textContent = "Please enter a valid email address (must include @ and a dot, with no spaces).";
  } else {
    toError.textContent = "";
  }

  const body = getBodyWithOptionalSignature();
  const mailtoUrl = buildMailto({
    to,
    subject: subjectInput.value,
    body,
    cc: ccInput.value,
    bcc: bccInput.value,
  });

  preview.value = mailtoUrl;
  snippetPreview.value = buildHtmlSnippet(mailtoUrl);

  openBtn.disabled = !isPrivacyMode && (!to || !isSimpleValidEmail(to));
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(preview.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy link";
    }, 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => {
      copyBtn.textContent = "Copy link";
    }, 1200);
  }
}

function openMailClient() {
  window.location.href = preview.value;
}

function resetForm() {
  modeInputs.forEach((input) => {
    input.checked = input.value === "privacy";
  });
  toInput.value = FAKE_EMAIL;
  subjectInput.value = "";
  bodyInput.value = "";
  ccInput.value = "";
  bccInput.value = "";
  signatureInput.checked = false;
  render();
}

modeInputs.forEach((input) => input.addEventListener("change", render));
[toInput, subjectInput, bodyInput, ccInput, bccInput, signatureInput].forEach((el) =>
  el.addEventListener("input", render),
);
copyBtn.addEventListener("click", copyLink);
openBtn.addEventListener("click", openMailClient);
resetBtn.addEventListener("click", resetForm);

presetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    subjectInput.value = btn.dataset.subject || "";
    bodyInput.value = btn.dataset.body || "";
    render();
  });
});

toInput.value = FAKE_EMAIL;
render();

window.buildMailto = buildMailto;
window.buildHtmlSnippet = buildHtmlSnippet;
