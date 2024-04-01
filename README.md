# Finance Tracker

Finance Tracker is a simple tool to help you manage your personal finances.

   

![2024-04-03 (1)](https://github.com/aashish47/finance-tracker/assets/134308022/e782d394-2ee1-4bba-95e9-e41137817d7f)
![2024-04-03 (2)](https://github.com/aashish47/finance-tracker/assets/134308022/d91cd0ef-58e1-4bc9-91fd-de794af8e78d)
![2024-04-03 (3)](https://github.com/aashish47/finance-tracker/assets/134308022/bf7eb2a8-41fa-422a-b698-35bac04bd36d)
![2024-04-03 (4)](https://github.com/aashish47/finance-tracker/assets/134308022/701051de-11ed-4ce9-ad1c-e71a704744eb)




## Installation


### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 20.11.1 (Download and install [Node.js](https://nodejs.org/) if you haven't already)
- **Go**: Version 1.22.0 (Download and install [Go](https://go.dev/) if you haven't already)

### Clone the repository

```bash
git clone https://github.com/aashish47/finance-tracker.git
```

### Setting up Supabase and Google Auth

Before running the Finance Tracker project, you'll need to set up Supabase for database management and Google Auth for user authentication. Follow these steps to configure Supabase and obtain the necessary keys:

1. **Set up Supabase Project and Google Auth**: 
   - Create a Supabase project and enable Google Auth.
   - Obtain the Supabase project URL, API key, Google Client ID, and Client Secret.
   - Add `http://localhost:3000` as an allowed redirect URL in Supabase Auth settings. (authentication -> url configuration -> site url)

   For detailed instructions, refer to the [Supabase Authentication Guide](https://supabase.com/docs/guides/auth/auth-deep-dive/auth-google-oauth).

2. **Configure Supabase Database**:
   - When setting up your Supabase database, ensure to choose connection pooling to session.
   - Set the pool size to 35 for optimal performance.

   For more information on configuring Supabase database connection pooling, refer to the [Supabase Documentation](https://supabase.com/docs).


3. **Seed the database(optional)**:
   - Open the Supabase SQL editor and connect to your project's PostgreSQL database.
   - Open the [seed.sql](seed.sql) file provided in the project
   - Copy and paste the SQL queries from seed.sql into the SQL editor and execute them to seed the database.

### Rename `.env.example` files

1. In the `frontend` directory, rename `.env.local.example` to `.env.local` and add the required keys.
2. In the `backend` directory, rename `.env.example` to `.env` and add the required keys.

Required keys will be available at project settings -> configuration -> Database and project settings -> configuration -> Api
Once you have obtained the necessary keys and configured Supabase and Google Auth, add them to your project's environment variables.

### Install dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

```

### Run the application

```bash
# Run frontend
cd finance-tracker/frontend
npm run dev

# Run backend
cd finance-tracker/backend
go run server.go
```
Open `http://localhost:3000` with your browser to see the result.

## Contribution

Contributions to Finance Tracker are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
