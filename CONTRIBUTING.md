# Contributing to Kamerwork

Thank you for your interest in contributing to Kamerwork! This guide will help you understand how to set up your development environment and contribute effectively to the project.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Project Structure](#project-structure)
- [Commit Conventions](#commit-conventions)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

### 1. Prerequisites

Before contributing, ensure you have all the required software installed. Follow the [SETUP.md](./SETUP.md) guide to:
- Install Java 11+
- Install Node.js 18+
- Install MongoDB 4.4+
- Set up MongoDB Compass

### 2. Fork and Clone Repository

```bash
# Fork the repository on GitHub (if applicable)

# Clone your fork
git clone https://github.com/yourusername/kamerwork.git 

# Navigate to project
cd kamerwork

# Add upstream remote
git remote add upstream https://github.com/original-owner/kamerwork.git
```

### 3. Create Development Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch Naming Convention:**
- Feature: `feature/feature-name`
- Bug fix: `bugfix/bug-name`
- Documentation: `docs/doc-name`
- Performance: `perf/improvement-name`

### 4. Set Up Development Environment

```bash
# Install dependencies for backend and frontend
cd kamerwork-backend
mvn install

cd ../kamerwork-frontend
npm install
```

---

## Development Workflow

### Running the Application Locally

Open 3 terminals:

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd kamerwork-backend
mvn spring-boot:run
```

**Terminal 3 - Frontend:**
```bash
cd kamerwork-frontend
npm run dev
```

### Making Changes

1. **Identify the right place** for your code based on project structure
2. **Write your code** following style guidelines
3. **Test your changes** locally before committing
4. **Keep commits small** and focused on single features/fixes

### Database Changes

If your feature requires database changes:

1. **Modify MongoDB Document Models**
   - Edit files in `kamerwork-backend/src/main/java/com/kamerwork/models/`
   - Add new fields to existing models or create new models

2. **Update Repositories**
   - Edit `kamerwork-backend/src/main/java/com/kamerwork/repositories/`
   - Add query methods as needed

3. **Create/Update DTOs**
   - Edit `kamerwork-backend/src/main/java/com/kamerwork/dto/`
   - Ensure data transfer objects match your model changes

4. **Verify with MongoDB Compass**
   - Open MongoDB Compass
   - Connect to `mongodb://localhost:27017/kamerwork`
   - View your collections to verify structure

---

## Code Style Guidelines

### Backend (Java)

Follow Spring Boot and Java conventions:

```java
// Class naming: PascalCase
public class UserService {
    
    // Method naming: camelCase
    public User getUserByEmail(String email) {
        // Method body
    }
    
    // Constants: UPPER_SNAKE_CASE
    private static final String USER_NOT_FOUND = "User not found";
    
    // Variables: camelCase
    private String userEmail;
    
    // Indentation: 4 spaces
    // Line length: Max 120 characters
}
```

**Best Practices:**
- Use `@Autowired` for dependency injection
- Place business logic in services, not controllers
- Use DTOs for API responses (never expose entities directly)
- Add meaningful Javadoc comments for public methods
- Use Optional for null-safe operations

```java
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Retrieves a user by email address.
     *
     * @param email the user's email address
     * @return Optional containing the user if found
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
```

### Frontend (React/JavaScript)

Follow React conventions:

```javascript
// Component naming: PascalCase
export function LoginComponent() {
    // Functional components preferred
    
    // Variable naming: camelCase
    const [isLoading, setIsLoading] = useState(false);
    
    // Function naming: camelCase
    const handleSubmit = (event) => {
        // Handle form submission
    };
    
    return (
        <div>
            {/* JSX with clear structure */}
        </div>
    );
}
```

**Best Practices:**
- Use functional components with hooks
- Lift state when multiple components need it
- Extract API calls to services
- Use descriptive variable names
- Keep components focused and small
- Add PropTypes or TypeScript for props validation

```javascript
import { useState } from 'react';
import PropTypes from 'prop-types';

export function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchUserData(userId);
    }, [userId]);
    
    const fetchUserData = async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            setUser(response.data);
        } catch (err) {
            setError(err.message);
        }
    };
    
    return (
        <div>
            {/* Component JSX */}
        </div>
    );
}

UserProfile.propTypes = {
    userId: PropTypes.string.isRequired,
};
```

### CSS/Styling

- Use CSS modules or styled components
- Follow BEM (Block Element Modifier) naming
- Responsive design first
- Consistent spacing and colors

---

## Project Structure

### Backend Structure

```
kamerwork-backend/src/main/java/com/kamerwork/
├── config/              # Configuration classes
│   ├── SecurityConfig.java       # Spring Security setup
│   └── AuditLoggingFilter.java  # Request logging filter
├── controllers/         # REST API endpoints
│   ├── AuthController.java       # Authentication endpoints
│   └── AuditLogController.java  # Audit log endpoints
├── services/            # Business logic
│   ├── AuthService.java          # Authentication logic
│   ├── ActivityLogService.java   # Activity logging
│   └── CaptchaService.java       # CAPTCHA verification
├── models/              # MongoDB entities
│   ├── User.java                 # User document
│   └── AuditLog.java             # Audit log document
├── repositories/        # Database access
│   ├── UserRepository.java       # User queries
│   └── AuditLogRepository.java  # Audit log queries
├── dto/                 # Data transfer objects
│   ├── LoginRequest.java         # Login DTO
│   └── AuthResponse.java         # Auth response DTO
└── Main.java            # Application entry point
```

**When to use each layer:**

| Layer | Responsibility | Example |
|-------|---|---|
| Controller | Handle HTTP requests, validation | Receive login data |
| Service | Business logic, orchestration | Verify password, create JWT |
| Repository | Database operations | Query user by email |
| Model | Data structure | User document schema |
| DTO | API contracts | Request/response objects |

### Frontend Structure

```
kamerwork-frontend/src/
├── pages/               # Full page components
│   ├── Login.jsx                 # Login page
│   ├── EmployerDashboard.jsx    # Dashboard
│   └── ...
├── components/          # Reusable components
│   ├── Navbar.jsx                # Navigation bar
│   └── ...
├── services/            # API & utility services
│   ├── api.js                    # Axios configuration
│   └── auditLogService.js        # Audit logging
├── styles/              # CSS files
│   ├── authStyles.js             # Auth page styles
│   └── LandingPage.css           # Landing page styles
└── main.jsx             # Entry point
```

---

## Commit Conventions

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Dependency updates, build process

### Examples

```bash
# Feature commit
git commit -m "feat(auth): add password reset functionality

- Add forgot password endpoint
- Send reset token via email
- Validate token and update password"

# Bug fix commit
git commit -m "fix(login): handle MongoDB connection timeout

- Add retry logic with exponential backoff
- Display user-friendly error message
- Log error details for debugging"

# Documentation commit
git commit -m "docs: update SETUP.md with MongoDB Compass guide"

# Style commit
git commit -m "style(frontend): format Login.jsx with Prettier"
```

### Guidelines
- Write commit messages in imperative mood ("add" not "added")
- Keep subject line under 50 characters
- Wrap body at 72 characters
- Reference issues: "Fixes #123"
- One logical change per commit

---

## Testing

### Backend Testing

```bash
cd kamerwork-backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report
```

### Frontend Testing

```bash
cd kamerwork-frontend

# Run linter
npm run lint

# Run linter with fix
npm run lint -- --fix
```

### Manual Testing Checklist

Before submitting a PR, test the following:

**Authentication Flow:**
- [ ] Can register new user
- [ ] Can login with valid credentials
- [ ] Cannot login with invalid credentials
- [ ] Can request password reset
- [ ] Can reset password with token

**Audit Logging:**
- [ ] Login attempts are logged
- [ ] Failed logins are recorded
- [ ] User actions are tracked
- [ ] Can view logs in MongoDB Compass

**UI/UX:**
- [ ] Pages load without errors
- [ ] Responsive on mobile (F12 DevTools)
- [ ] Form validation works
- [ ] Error messages are clear

---

## Pull Request Process

### 1. Prepare Your Branch

```bash
# Update your branch with latest changes
git fetch upstream
git rebase upstream/main

# If conflicts occur, resolve them and continue
git rebase --continue
```

### 2. Test Your Changes

```bash
# Backend
cd kamerwork-backend
mvn clean test

# Frontend
cd kamerwork-frontend
npm run lint
npm run build
```

### 3. Create Pull Request

1. Push your branch to GitHub
   ```bash
   git push origin feature/your-feature-name
   ```

2. Go to GitHub and create a PR with:
   - Clear title describing the change
   - Description of what was changed and why
   - Reference to related issues (#123)
   - Screenshots if UI changes

### 4. PR Template

Use this template in your PR description:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
Describe how to test these changes:
- [ ] I have tested locally
- [ ] Tests pass
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tested on Chrome/Firefox
```

### 5. Code Review

- Address review comments promptly
- Make requested changes in new commits
- Respond to feedback with explanations
- Re-request review after updates

### 6. Merging

- Ensure all CI checks pass
- Get approval from maintainer
- Squash commits if requested
- Delete branch after merge

---

## Reporting Issues

### Bug Report Template

When reporting a bug, include:

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if applicable

## Environment
- OS: [Windows/macOS/Linux]
- Browser: [Chrome/Firefox]
- Node Version: [output of `node --version`]
- Java Version: [output of `java -version`]
```

### Feature Request Template

```markdown
## Description
Brief description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How it should work

## Alternatives Considered
Other approaches
```

---

## Development Tips

### Debugging Backend

```bash
# Run with debug output
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"

# Check logs
tail -f target/spring.log

# Use MongoDB Compass to inspect data
# Connect to: mongodb://localhost:27017/kamerwork
```

### Debugging Frontend

```bash
# Use Chrome DevTools (F12)
# - Console tab for errors
# - Network tab to see API calls
# - Application tab for storage

# Use React Developer Tools extension
# - Component tree inspection
# - Props/state values

# Use VS Code debugger
# Add breakpoint and run: npm run dev
```

### Useful Commands

```bash
# Backend
mvn clean install              # Clean rebuild
mvn dependency:tree            # View dependencies
mvn compile                    # Compile only
mvn package -DskipTests        # Build without tests

# Frontend
npm outdated                   # Check for updates
npm audit                      # Check vulnerabilities
npm audit fix                  # Fix vulnerabilities
npm run build                  # Production build
```

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and inclusive
- Provide constructive feedback
- Accept criticism gracefully
- Help new contributors
- Report misconduct to maintainers

---

## Questions or Need Help?

- Check existing documentation in [SETUP.md](./SETUP.md) and [README.md](./README.md)
- Review [AUDIT_LOGGING_SYSTEM.md](./AUDIT_LOGGING_SYSTEM.md) for logging details
- Open an issue with your question
- Join discussions on GitHub

---

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Kamerwork! 🎉

**Last Updated**: April 2026
