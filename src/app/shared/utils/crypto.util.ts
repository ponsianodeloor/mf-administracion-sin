// Lightweight RSA-OAEP (SHA-256) encryption helper using WebCrypto

const PUBLIC_KEY_BASE64 = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3gRdGoLPhwahVZ4mRf3E
Gpv/6w1bDu7sKAVE7F+PIjETF6Rss8UVZ3I4Kj7BTkfJpQBgKJ68rok1TqmayOC+
sAORHkPGjCJR541LAfasgpUEASQx3BnLLMKy73sFzg4fFQ62RXc1mBNMjn69Y73W
c8089cI5C4zXapBboHxdCUgRr8V2EdpnJQpTYw8qRN/rIrVTs0qqzAa2Nm6JQgBs
WK6wCP2jUYlWDVcCl7HtTuRUpFd7pV/Y4daLVovoj+5x84Dn2FMZjqJFRDsw46oC
N0KKnxnLIvUUwCXKPu555RHuN2qBgy7q6LtmvOfzyzsqMD76mUrhDxiuwVUimph2
SQIDAQAB`;

let cachedKey: CryptoKey | null = null;

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binStr = atob(base64.replace(/\s+/g, ''));
  const len = binStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
  return bytes.buffer;
}

async function getPublicKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const spki = base64ToArrayBuffer(PUBLIC_KEY_BASE64);
  cachedKey = await crypto.subtle.importKey(
    'spki',
    spki,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt']
  );
  return cachedKey;
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  // Standard base64
  const b64 = btoa(bin);
  // Convert to base64url (RFC 7515): replace +/, remove padding
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function encryptWithPublicKey(plainText: string): Promise<string> {
  if (!plainText) return '';
  const enc = new TextEncoder();
  const key = await getPublicKey();
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    key,
    enc.encode(plainText)
  );
  const bytes = new Uint8Array(cipherBuf);
  const b64url = toBase64Url(bytes);
  return `v1.rsa_oaep_sha256.${b64url}`;
}
