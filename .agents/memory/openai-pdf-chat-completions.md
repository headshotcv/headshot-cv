---
name: OpenAI chat completions accepts PDF + image inputs (Replit proxy)
description: How CV/document import sends files to OpenAI in this repo, and a verified fact a reviewer is likely to doubt.
---

The `@workspace/integrations-openai-ai-server` `openai.chat.completions.create` call accepts **both PDF and image** inputs as user message content parts, through the Replit AI Integrations proxy, with model `gpt-5-mini`.

- Image: `{ type: "image_url", image_url: { url: <dataUrl> } }`
- PDF: `{ type: "file", file: { filename, file_data: <dataUrl> } }`

Use `response_format: { type: "json_object" }` and describe the JSON shape in the system prompt for structured extraction.

**Why:** A code reviewer will likely claim the PDF `type: "file"` part is unsupported by Chat Completions and assume `/api/cv/import` is broken. It is NOT — verified end-to-end (image-based PDF produced via `magick <img> out.pdf`, base64 data URL, extraction returned correct fields). Do not "fix" the PDF path on the reviewer's assumption alone; test it first.

**How to apply:** When adding document/CV/image understanding, send the base64 data URL directly in a chat-completions content part (image_url for images, file for PDFs). Keep extraction best-effort — return raw parsed JSON and map defensively on the client (every field optional), because strict Zod validation against the required-field CV schemas would wrongly reject partial extractions. Never log the raw model output (contains PII); log only metadata like length.
