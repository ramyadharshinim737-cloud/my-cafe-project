pipeline {
    agent any 
    stages {
        stage('Checkout') {
            steps {
                retry(3) { // Retry the checkout step up to 3 times
                    checkout scm
                }
            }
        }
        // Other stages...
    }
}