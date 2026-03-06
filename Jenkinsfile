pipeline {
    agent any
    
    environment {
        // Unga Docker Hub username-ah inga maathikkonga
        DOCKER_HUB_USER = 'ramyadharshini'
        DOCKER_HUB_CREDS = 'docker-hub-creds' // Jenkins-la neenga create panna ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ramyadharshinim737-cloud/my-cafe-project.git'
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    // Backend image build and push
                    docker.withRegistry('', "${DOCKER_HUB_CREDS}") {
                        def backendImg = docker.build("${DOCKER_HUB_USER}/cafe-backend:latest", "./backend")
                        backendImg.push()
                    }
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                script {
                    // Frontend image build and push
                    docker.withRegistry('', "${DOCKER_HUB_CREDS}") {
                        def frontendImg = docker.build("${DOCKER_HUB_USER}/cafe-frontend:latest", "./frontend")
                        frontendImg.push()
                    }
                }
            }
        }
    }
}