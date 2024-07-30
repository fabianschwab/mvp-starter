#!/bin/sh

Green='\033[0;32m'
BGreen='\033[1;32m'
Cyan='\033[0;36m'
Yellow='\033[0;33m'
BYellow='\033[1;33m'
BCyan='\033[1;36m'

Color_Off='\033[0m'

# Function to install dependencies if node_modules folder is not present
install_dependencies() {
  if [ ! -d "node_modules" ]; then
    echo "${Cyan}Node:${Color_Off} node_modules folder not found. ${BYellow}Installing dependencies...${Color_Off}"
    npm install
  else
    echo "${Cyan}Node:${Color_Off} node_modules folder already exists. ${Yellow}Skipping dependency installation.${Color_Off}"
  fi
  echo ""
}

# Function to read .env.example and store variable names in an array
read_env_example() {
  declare -a env_vars=()
  declare -a default_values=()

  while IFS= read -r line; do
    # Skip comments
    if [[ $line == \#* ]]; then
      continue
    fi

    # Check if the line contains a variable definition
    if [[ $line == *=* ]]; then
      # Extract variable name and value
      var_name=$(echo "$line" | cut -d '=' -f 1)
      var_value=$(echo "$line" | cut -d '=' -f 2-)

      # Store the variable name in the array if the value is not <random_secret>
      if [[ $var_value != "<random_secret>" ]]; then
        env_vars+=("$var_name")
        default_values["$var_name"]="$var_value"
      else
        # Write <random_secret> variables directly to .env
        var_random_secret=$(openssl rand -hex 32)
        echo "$var_name=$var_random_secret" >> .env
      fi
    fi
  done < .env.example

  echo "${env_vars[@]}"
  echo "${!default_values[@]}"
}

# Function to create .env file and prompt for values
create_env_file() {
  if [ ! -f ".env" ]; then
    echo "${Cyan}Environment:${Color_Off} No .env file not found. ${BYellow}Creating .env file...${Color_Off}"
    touch .env

    # Get the array of variable names
    env_vars=($(read_env_example))

    # Loop over the array and prompt the user for input
    for var_name in "${env_vars[@]}"; do
      default_value="${default_values[$var_name]}"
      printf "${Cyan}Environment:${Color_Off} Enter value for ${Green}$var_name${Color_Off}: "
      read -r user_value
      user_value=${user_value:-$default_value}
      echo "$var_name=$user_value" >> .env
    done
  else
    echo "${Cyan}Environment:${Color_Off} .env file already exists. ${Yellow}Skipping .env creation.${Color_Off}"
  fi
}

# Main script execution
install_dependencies
create_env_file

# Run the development server
echo "Starting the development server..."
npm run dev
