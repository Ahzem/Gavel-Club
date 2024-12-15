# Contributing to Gavel Club of ITUM Website

First off, thank you for considering contributing to the Gavel Club website! 👍

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/Ahzem/Gavel-Club.git
```

## Development Setup

1. Install dependencies:
```bash
# Frontend
cd Client
npm install

# Backend
cd ../Server
npm install
```

2. Create environment files following `.env.example` templates in both Client and Server directories

3. Start development servers:
```bash
# Frontend
cd Client
npm run dev

# Backend
cd Server
npm run dev
```

## Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Component structure:
  ```typescript
  // Components
  import React from 'react'
  import styles from './ComponentName.module.css'

  interface ComponentNameProps {
    // props interface
  }

  export const ComponentName: React.FC<ComponentNameProps> = ({ props }) => {
    return (
      // JSX
    )
  }
  ```

## Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
3. Test your changes:
```bash
# Frontend
npm run test

# Backend
npm run test
```

4. Commit your changes:
```bash
git commit -m "feat: description of your changes"
```

Follow commit message conventions:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding/updating tests

## Pull Request Process

1. Update documentation if needed
2. Update the 

README.md

 with details if needed
3. Push to your fork and submit a pull request
4. Add screenshot/video if UI changes
5. Link any related issues

## Issue Reporting

1. Use issue templates
2. Include:
   - Browser/Node version
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable

## Branch Naming

- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring
- `test/*` - Test additions/updates

## Testing

- Write unit tests for new features
- Ensure existing tests pass
- Add integration tests when needed

## Security Guidelines

- No credentials in code
- Validate all inputs
- Use prepared statements for DB queries
- Implement rate limiting
- Follow OWASP guidelines

## Questions?

Contact the maintainer:
- Email: muhammadhahzem1422@gmail.com
- LinkedIn: [Ahzem](https://www.linkedin.com/in/Ahzem/)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
