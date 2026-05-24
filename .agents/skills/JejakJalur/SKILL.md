```markdown
# JejakJalur Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the JejakJalur TypeScript codebase. You'll learn how to structure files, write imports and exports, follow commit message conventions, and organize tests. This guide is ideal for contributors seeking to maintain consistency and quality in JejakJalur projects.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - Example:  
    ```
    UserProfile.ts
    RouteFinder.ts
    ```

### Import Style
- Use **alias imports** to reference modules.
  - Example:
    ```typescript
    import UserService from 'services/UserService';
    import { RouteType } from 'types/RouteType';
    ```

### Export Style
- Use **default exports** for modules.
  - Example:
    ```typescript
    // In UserProfile.ts
    class UserProfile { /* ... */ }
    export default UserProfile;
    ```

### Commit Messages
- Follow the **conventional commit** format.
- Use the `feat` prefix for new features.
- Keep commit messages descriptive (average 110 characters).
  - Example:
    ```
    feat: add route calculation logic for multi-modal journeys
    ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature or module  
**Command:** `/feature-development`

1. Create a new file using PascalCase (e.g., `NewFeature.ts`).
2. Implement the feature using TypeScript, following import/export conventions.
3. Write or update corresponding test files (`NewFeature.test.ts`).
4. Commit changes using the conventional commit format with the `feat` prefix.
5. Open a pull request for review.

### Testing
**Trigger:** When writing or updating tests  
**Command:** `/run-tests`

1. Create or update test files matching the `*.test.*` pattern (e.g., `RouteFinder.test.ts`).
2. Use the project's preferred (unknown) testing framework.
3. Run tests locally to ensure correctness.
4. Commit test changes with a descriptive message.

## Testing Patterns

- Test files are named using the `*.test.*` pattern.
  - Example: `UserProfile.test.ts`
- The specific testing framework is not detected; follow existing patterns in the repo.
- Place tests alongside their corresponding modules or in a dedicated test directory.

## Commands
| Command              | Purpose                                             |
|----------------------|-----------------------------------------------------|
| /feature-development | Start a new feature/module with proper conventions  |
| /run-tests           | Run or update tests for your changes                |
```