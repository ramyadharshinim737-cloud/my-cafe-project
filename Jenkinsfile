pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshinim'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
        DOCKER_HOST = 'tcp://host.docker.internal:2375'
    }
    stages {
        stage('Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", 
                                     passwordVariable: 'DOCKER_HUB_PASSWORD', 
                                     usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        echo 'Logging into Docker Hub...'
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p '${DOCKER_HUB_PASSWORD}'"
                        
                        echo 'Building and Pushing Backend...'
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        echo 'Building and Pushing Frontend...'
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}
