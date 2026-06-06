# Isolated Neutral Demonstration

This directory is a deliberately non-reconstructive demonstration copy.

It contains:

- A synthetic frontend workflow with arbitrary labels, keys, and demo units.
- Two sanitized archive components that preserve only generic interaction patterns.
- A local-only Express service with opaque same-origin paths.
- No identity fields, free-text submission fields, external destinations,
  production configuration, commercial values, original taxonomy, or persistence.

The local service accepts exactly one structurally validated synthetic digest
shape and rejects arbitrary text, additional fields, and invalid combinations.

## Run

```powershell
cd backend-v2
npm install
npm start
```

The service binds only to `127.0.0.1:5050`.
