pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshini'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
    }
    stages {
        stage('Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        // Windows Batch command use panrom - ithu WSL error-ah thavirkkum
                        echo 'Logging into Docker Hub...'
                        bat "docker login -u %DOCKER_HUB_USERNAME% -p %DOCKER_HUB_PASSWORD%"
                        
                        echo 'Building and Pushing Backend...'
                        bat "docker build -t %DOCKER_HUB_USER%/cafe-backend:latest ./backend"
                        bat "docker push %DOCKER_HUB_USER%/cafe-backend:latest"
                        
                        echo 'Building and Pushing Frontend...'
                        bat "docker build -t %DOCKER_HUB_USER%/cafe-frontend:latest ./frontend"
                        bat "docker push %DOCKER_HUB_USER%/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}