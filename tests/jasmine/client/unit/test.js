describe('AddNewTaskCtrl', function () {
    beforeEach(module('trace_workers_app'));

    /*
     * obtener un nuevo controller, meteor y taskService al ejecutar cada test
     */
    var $controller = {}, tasks = {}, $scope = {}, $rootScope = {};
    beforeEach(inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $meteor = $injector.get('$meteor');
        tasks = $injector.get('tasksService');
    }));

    $rootScope.currentUser = {_id:'z8dl49&%A1}'};

    it('Insertar una tarea o mantenimiento', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('AddNewTaskCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var addNewTask = $scope.addNewTask;
        $scope.newTask = {client:'Maria Teresa',address:'AV 1 # 50',description:'ok', date:new Date("2015-05-18T21:55:18Z")};
        addNewTask();
        expect($scope.added).toEqual(1);
    });
    it('NO insertar tarea o mantenimiento cuando falta un campo', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('AddNewTaskCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var addNewTask = $scope.addNewTask;
        $scope.newTask = {client:'Maria Teresa',description:'ok', date:new Date("2015-05-18T21:55:18Z")};
        addNewTask();
        expect($scope.added).toEqual(0);
    });
    it('NO insertar tarea o mantenimiento con formato de fecha incorrecto', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('AddNewTaskCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var addNewTask = $scope.addNewTask;
        $scope.newTask = {client:'Maria Teresa',address:'AV 1 # 50',description:'ok', date:'2018-03-02'};
        addNewTask();
        expect($scope.added).toEqual(0);
    });
});

describe('TaskDetailsCtrl', function () {
    beforeEach(module('trace_workers_app'));

    /*
     * obtener un nuevo controller, meteor y taskService al ejecutar cada test
     */
    var $controller = {}, tasks = {}, $scope = {}, $rootScope = {};
    beforeEach(inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $meteor = $injector.get('$meteor');
        //$scope = $injector.get('$scope');
        tasks = $injector.get('tasksService');
    }));

    $rootScope.currentUser = {_id:'z8dl49&%A1}'};

    it('Modificar una tarea o mantenimiento', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('TaskDetailsCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var save = $scope.save;
        //$scope.task = {client:'Maria Teresa',address:'AV 1 # 50',description:'ok', date:new Date("2015-05-18T21:55:18Z")};
        $scope.task = $meteor.object(tasksObjs, 1, false);
        //agregar los elementos de prueba necesarios para la validación
        $scope.task.client='Maria Teresa';$scope.task.address='AV 1 # 50';$scope.task.description='ok';$scope.task.date=new Date("2015-05-18T21:55:18Z");
        $scope.task._id="Gyobzza3p2KD52KXX";$scope.task.$$id="Gyobzza3p2KD52KXX";
        save();
        expect($scope.saved).not.toEqual(0);
    });
    it('NO Modificar una tarea o mantenimiento con información incompleta', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('TaskDetailsCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var save = $scope.save;
        //$scope.task = {client:'Maria Teresa',address:'AV 1 # 50',description:'ok', date:new Date("2015-05-18T21:55:18Z")};
        $scope.task = $meteor.object(tasksObjs, 1, false);
        //agregar los elementos de prueba necesarios para la validación
        $scope.task.client='Maria Teresa';$scope.task.date=new Date("2015-05-18T21:55:18Z");
        $scope.task._id="Gyobzza3p2KD52KXX";$scope.task.$$id="Gyobzza3p2KD52KXX";
        save();
        expect($scope.saved).toEqual(0);
    });
    it('NO Modificar una tarea o mantenimiento con formate de fecha incorrecta', function () {
        var tasksObjs = tasks.tasksObj();
        var tasksCollection = $meteor.collection(tasks.tasksObj()).subscribe('tasks');
        $controller('TaskDetailsCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            tasks: tasksCollection
        });
        var save = $scope.save;
        //$scope.task = {client:'Maria Teresa',address:'AV 1 # 50',description:'ok', date:new Date("2015-05-18T21:55:18Z")};
        $scope.task = $meteor.object(tasksObjs, 1, false);
        //agregar los elementos de prueba necesarios para la validación
        $scope.task.client='Maria Teresa';$scope.task.date="2015-05-18T21:55:18Z";
        $scope.task._id="Gyobzza3p2KD52KXX";$scope.task.$$id="Gyobzza3p2KD52KXX";
        save();
        expect($scope.saved).toEqual(0);
    });
});


describe('RegisterCtrl', function () {
    beforeEach(module('trace_workers_app'));

    /*
     * obtener un nuevo controller, meteor y taskService al ejecutar cada test
     */
    var $controller = {}, tasks = {}, vm = {}, $rootScope = {};
    beforeEach(inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $meteor = $injector.get('$meteor');
        //$scope = $injector.get('$scope');
        $state = $injector.get('$state');
    }));


    it('Registrar nuevo usuario', function () {
        var vm;
        var cont = $controller('RegisterCtrl', {
            $state: $state,
            $meteor: $meteor
        });
        spyOn(cont, "register");
        var register = cont.register;
        cont.credentials = {email: 'correo@gmail.com', password: 'a987s9'};
        register();
        expect(cont.register).toHaveBeenCalled();
    });
});

