<div align="center">
  <img src="/logo.svg" alt="Logo" width="200"/>
  <h1>Three Questions AI</h1>
</div>

You can do this by pressing three question marks in quick succession and it will automatically continue writing for you with no extra operations.

## Features

This project utilizes the following technologies and libraries:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/) - A fast build tool for modern web development.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [OpenAI API](https://beta.openai.com/) - A powerful API for natural language processing.
- [Shadcn UI](https://shadcn.com/) - A collection of beautiful, accessible, and dark mode-compatible UI components.
- [Radix UI](https://radix-ui.com/) - A set of UI primitives for building high-quality, accessible UI components.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/evanlong0926/three-questions-ai.git
   ```

2. Navigate to the project directory:

  ```bash
  cd three-questions-ai
  ```

3. Install the required dependencies:

   ```bash
   pnpm install
   ```

## Usage

Obtain an API key from OpenAI and add it to the project. You can add your API key in the following location:

```ts
// src/components/Home.tsx
const openaiKey = 'YOUR_OPENAI_API_KEY';
```

1. Run the development server:


```bash
npm start
```

2. Open your browser and visit `http://localhost:3000` to interact with the AI Dropdown Menu.

3. To wake up the AI, type `/` in the text area. The dropdown menu will provide options for AI-generated thoughts and continuing your writing.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository to your GitHub account.

2. Create a new branch for your feature or bug fix:


```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and ensure they are properly tested.

Commit your changes and push them to your forked repository:


```bash
git commit -m "Add your commit message"
git push origin feature/your-feature-name
```

4. Create a pull request from your branch to the main repository.

5. Our team will review your pull request and provide feedback.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
