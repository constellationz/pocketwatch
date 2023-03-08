# pocketwatch

A MERN stack time tracking app

## Getting Started

1. Clone the git repository

```bash
git clone https://github.com/constellationz/pocketwatch && cd pocketwatch
```

2. Install dependencies

```bash
npm install
```

3. Set up `.env`

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your mongo cluster URI>
JWT_SECRET = abc123
```

4. Host test server

```bash
npm run nodemon
```

## Usage

Commands:

1. Host the server and restart when changes are detected

```bash
npm run nodemon
```


2. Host the frontend and listen for changes

```bash
npm run client
```

3. Host both the server and the backend and listen for changes on both

```bash
npm run dev
```

4. Check for style infractions in files

```bash
npm run check
```

5. Automatically style files with prettifier

```bash
npm run prettify
```

## Attribution

`pocketwatch` is licensed under the MIT license.
