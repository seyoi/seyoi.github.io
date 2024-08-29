brew install postgresql@14
brew services start postgresql@14
psql postgres -f ./@initializeLocal/createDB.sql