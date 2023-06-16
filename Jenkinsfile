pipeline{
    agent any

    stages{
        stage('Clonar o repositório'){
            steps{
                git branch: 'main', url: 'https://github.com/alexgrocha/teste_APIRest_cy.git'
            }
        }
        stage('Instalar depedências'){
            steps{
                sh 'npm install'
            }
        }
        stage('Executar Testes'){
            steps{
                sh 'NO_COLOR=1 npm cy:run'
            }
        }
    }
}