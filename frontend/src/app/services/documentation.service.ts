import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentationService {
  private drawer!: MatDrawer;
  currentContent = new BehaviorSubject<string>('frontend');

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  openDocumentation(contentType: string) {
    this.currentContent.next(contentType);
    if (this.drawer) {
      this.drawer.open();
    }
  }

  toggleDocumentation(contentType: string) {
    if (this.drawer.opened && this.currentContent.value === contentType) {
      this.drawer.close();
    } else {
      this.openDocumentation(contentType);
    }
  }

  getContent(contentType: string): string {
    switch (contentType) {
      case 'frontend':
        return this.getFrontendContent();
      case 'backend':
        return this.getBackendContent();
      case 'api':
        return this.getApiExamplesContent();
      case 'about':
        return this.getAboutContent();
      default:
        return this.getFrontendContent();
    }
  }

  private getFrontendContent(): string {
    return `
      <h2>Frontend Documentation</h2>
      <p>Angular 16 application using Apollo Client for GraphQL communication</p>
      
      <h3>Tech Stack</h3>
      <ul>
        <li><strong>Framework:</strong> Angular 16</li>
        <li><strong>State Management:</strong> Apollo Client 3.8</li>
        <li><strong>UI Components:</strong> Angular Material</li>
        <li><strong>Routing:</strong> Angular Router</li>
      </ul>
      
      <h3>Key Features</h3>
      <ul>
        <li>Real-time user listing with automatic refresh</li>
        <li>Form validation for all inputs</li>
        <li>Responsive design for all screen sizes</li>
        <li>Error handling with user notifications</li>
        <li>Documentation integrated in the UI</li>
      </ul>
      
      <h3>Running the Frontend</h3>
      <ol>
        <li>Navigate to frontend directory: <code>cd frontend</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Start development server: <code>ng serve</code></li>
        <li>Open browser to: <a href="http://localhost:4200" target="_blank">http://localhost:4200</a></li>
      </ol>
      
      <h3>Fetching All Users</h3>
      <p>The frontend automatically fetches all users on page load:</p>
    `;
  }

  private getBackendContent(): string {
    return `
      <h2>Backend Documentation</h2>
      <p>Python FastAPI server with Strawberry GraphQL implementation</p>
      
      <h3>Tech Stack</h3>
      <ul>
        <li><strong>Framework:</strong> FastAPI</li>
        <li><strong>GraphQL:</strong> Strawberry</li>
        <li><strong>Server:</strong> Uvicorn</li>
      </ul>
      
      <h3>Running the Backend</h3>
      <ol>
        <li>Navigate to backend directory: <code>cd backend</code></li>
        <li>Create virtual environment: <code>python -m venv venv</code></li>
        <li>Activate environment:
          <ul>
            <li>Windows: <code>venv\\Scripts\\activate</code></li>
            <li>Mac/Linux: <code>source venv/bin/activate</code></li>
          </ul>
        </li>
        <li>Install dependencies: <code>pip install -r requirements.txt</code></li>
        <li>Start server: <code>uvicorn main:app --reload</code></li>
        <li>Access GraphQL Playground: <a href="http://localhost:8000/graphql" target="_blank">http://localhost:8000/graphql</a></li>
      </ol>
      
      <h3>Data Storage</h3>
      <p>The backend uses in-memory storage with automatic ID generation:</p>
      <pre># In-memory storage
users = []
next_id = 1</pre>
    `;
  }

  private getApiExamplesContent(): string {
    return `
      <h2>GraphQL API Examples</h2>
      <p>All examples can be tested in the GraphQL Playground at <a href="http://localhost:8000/graphql" target="_blank">http://localhost:8000/graphql</a></p>
      
      <h3>GET ALL USERS</h3>
      <pre>query {
  getAllUsers {
    id
    name
    email
    role
  }
}</pre>
      
      <h3>CREATE USER</h3>
      <pre>mutation {
  createUser(
    name: "John Doe", 
    email: "john@example.com", 
    role: "User"
  ) {
    id
    name
    email
    role
  }
}</pre>
      
      <h3>UPDATE USER</h3>
      <pre>mutation {
  updateUser(
    id: 1, 
    name: "Updated Name", 
    email: "updated@example.com"
  ) {
    id
    name
    email
    role
  }
}</pre>
      
      <h3>DELETE USER</h3>
      <pre>mutation {
  deleteUser(id: 1)
}</pre>
    `;
  }

  private getAboutContent(): string {
    return `
      <h2>About This Project</h2>
      <p>A modern user directory application with full CRUD operations</p>
      
      <h3>Project Features</h3>
      <ul>
        <li>Complete user management system</li>
        <li>Real-time updates</li>
        <li>Form validation</li>
        <li>Responsive design</li>
        <li>Integrated documentation</li>
      </ul>
        </div>
      </div>
    `;
  }
}
