pipeline {
    agent { label 'JenkinsSlave03' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub') // Docker Hub credentials in Jenkins
    }

    stages {
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        dir('backend') {
                            sh 'docker build -t mohamedessam1911/backend_task-manager .'
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        dir('frontend') {
                            sh 'docker build -t mohamedessam1911/frontend_task-manager .'
                        }
                    }
                }
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Backend Image') {
                    steps {
                        sh 'docker push mohamedessam1911/backend_task-manager'
                    }
                }
                stage('Push Frontend Image') {
                    steps {
                        sh 'docker push mohamedessam1911/frontend_task-manager'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
