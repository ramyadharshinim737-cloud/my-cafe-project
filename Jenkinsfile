pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshinim'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
    }
    stages {
        stage('Build & Push') {
            agent {
                node {
                    label 'any'
                    retries 2
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", 
                                     passwordVariable: 'DOCKER_HUB_PASSWORD', 
                                     usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        echo 'Logging into Docker Hub...'
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker login -u ${DOCKER_HUB_USERNAME} -p '${DOCKER_HUB_PASSWORD}'"
                        
                        echo 'Building Backend...'
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        echo 'Building Frontend...'
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "export DOCKER_HOST=tcp://host.docker.internal:2375 && docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}