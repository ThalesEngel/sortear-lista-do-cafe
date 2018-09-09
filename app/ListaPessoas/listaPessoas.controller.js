(function () {
    'use strict';

    angular.module('app')
        .controller('listaPessoasCtrl', ListaPessoasController)

    ListaPessoasController.$inject = ['$scope', '$window'];

    function ListaPessoasController($scope, win) {

        var vm = this
        vm.nome = "";
        vm.listaPessoas = [];
        vm.listaCafe = [];
        vm.nomeValido = true;

        // FUNCTIONS                
        vm.listarPessoasCastradas = listarPessoasCastradas;
        vm.removerPessoa = removerPessoa;
        vm.sortearListaCafe = sortearListaCafe;
        vm.exibirDia = exibirDia
        vm.submit = submit;

        iniciarController();

        function iniciarController() {
            console.log("Iniciado");
            if (JSON.parse(win.localStorage.getItem('listaPessoasCadastradas')))
                vm.listaPessoas = JSON.parse(win.localStorage.getItem('listaPessoasCadastradas'));

            if (JSON.parse(win.localStorage.getItem('listaPessoasCafe')))
                vm.listaCafe = JSON.parse(win.localStorage.getItem('listaPessoasCafe'));
        }

        function submit(nome) {
            if (vm.listaPessoas.some(p => p.toLowerCase() == nome.toLowerCase())) {
                vm.nomeValido = false;
                return false;
            }

            if ($scope.pForm.$valid) {
                vm.nomeValido = true;
                adicionarPessoa(nome)
                $scope.pForm.$setPristine();
                $scope.pForm.$submitted = false;
                $scope.pForm.pNome.$dirty = false;
            }
        }

        function adicionarPessoa(nome) {
            vm.listaPessoas.push(nome);
            win.localStorage.setItem('listaPessoasCadastradas', JSON.stringify(vm.listaPessoas));
            vm.nome = '';
        }

        function removerPessoa(pessoa) {
            var i = vm.listaPessoas.findIndex(p => p == pessoa);
            vm.listaPessoas.splice(i, 1)[0];
            win.localStorage.setItem('listaPessoasCadastradas', JSON.stringify(vm.listaPessoas));
        }

        function listarPessoasCastradas() {
            vm.listaPessoas = JSON.parse(win.localStorage.getItem('listaPessoasCadastradas'));
        }

        function exibirDia(index) {
            const diasDaSemana = ['Segunda', 'Segunda', 'Terça', 'Terça', 'Quarta', 'Quarta', 'Quinta', 'Quinta', 'Sexta', 'Sexta']
            if (index >= diasDaSemana.length)
                return "";
            return diasDaSemana[index];
        }

        function peencherDiasRestantes(grupo) {
            for (let index = 0; grupo.length < 10; index++) {
                if (!grupo[index]) {
                    index = 0;
                }
                grupo.push(grupo[index]);
            }
        }

        function sortearListaCafe() {
            listarPessoasCastradas();
            vm.listaCafe = [];
            var listaAux = [];
            var i;
            listaAux = angular.copy(vm.listaPessoas)
            var n = listaAux.length;
            while (n) {
                i = Math.floor(Math.random() * n--);
                vm.listaCafe.push(listaAux.splice(i, 1)[0])
            }

            peencherDiasRestantes(vm.listaCafe)
            win.localStorage.setItem('listaPessoasCafe', JSON.stringify(vm.listaCafe));
        }
    };
})();