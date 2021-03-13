To access DB through GUI navigate to applications and run pgAdmin4 

To access Postgresql shell in command line: 

1. To start PostgreSQL run command: pg_ctl -D /opt/homebrew/var/postgres start To stop PostgreSQL run command: pg_ctl -D /opt/homebrew/var/postgres stop

2. Once the server has been started run psql to bring up command line

3. To list current databases run \l to bring up list of databases 

4. To create a db run either createdb "db_name" or psql "existing db_name"

5. To list current tables in database run \dt run \d+ "a specific table" to get detailed information on that table

6. Run \q to exit postgres shell

######

TLDR; 

Once postgres is installed and server has been started: 

1. Run "psql" 

2. Run "CREATE DATABASE iteration1;" 

3. Run "CREATE USER diamond_hands WITH SUPERUSER;"

4. Run "GRANT ALL PRIVILEGES ON DATABASE iteration1 TO diamond_hands:"




