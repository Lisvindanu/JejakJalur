```markdown
# JejakJalur Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the JejakJalur TypeScript codebase. It covers file naming, import/export styles, commit message conventions, and testing patterns. While no specific framework or CI workflows are detected, this guide will help you contribute code that aligns with the project's established standards.

## Coding Conventions

### File Naming
- **Pattern:** PascalCase  
  Each file name should use PascalCase, capitalizing the first letter of each word.
  ```
  // Good
  UserProfile.ts

  // Bad
  user_profile.ts
  userprofile.ts
  ```

### Import Style
- **Pattern:** Alias imports  
  Use aliases when importing modules for clarity and maintainability.
  ```typescript
  import UserService from '@services/UserService';
  ```

### Export Style
- **Pattern:** Default exports  
  Each module should export a single default entity.
  ```typescript
  // UserProfile.ts
  class UserProfile { /* ... */ }
  export default UserProfile;
  ```

### Commit Messages
- **Pattern:** Conventional commits  
  Use prefixes like `feat` for new features and `fix` for bug fixes.  
  Keep commit messages concise (average: 68 characters).
  ```
  feat: add user authentication flow
  fix: correct route calculation logic
  ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature`

1. Create a new branch for your feature.
2. Implement the feature using PascalCase file naming, alias imports, and default exports.
3. Write or update relevant tests (`*.test.*`).
4. Commit changes using the `feat:` prefix.
5. Open a pull request for review.

### Bug Fixing
**Trigger:** When fixing a bug  
**Command:** `/fix`

1. Create a new branch for your bug fix.
2. Apply the fix, following coding conventions.
3. Update or add tests to cover the fix.
4. Commit changes using the `fix:` prefix.
5. Open a pull request for review.

## Testing Patterns

- **File Pattern:** `*.test.*`  
  Test files are named with `.test.` in the filename, e.g., `UserProfile.test.ts`.
- **Framework:** Unknown  
  While the specific testing framework is not detected, tests are colocated with source files or in dedicated test files.
- **Example:**
  ```typescript
  // UserProfile.test.ts
  import UserProfile from '@components/UserProfile';

  describe('UserProfile', () => {
    it('should render user data', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command   | Purpose                             |
|-----------|-------------------------------------|
| /feature  | Start a new feature development     |
| /fix      | Begin a bug fix workflow           |
```
