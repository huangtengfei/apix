angular.module("apix").service("AlertService", ["$http", "$document", "$q", "$rootScope", "$compile", function ($http, $document, $q, $rootScope, $compile) {
    var zIndex = 1200;
    var dialogCounter = 0;

    var dialogArr = [];

    var mask = angular.element('<div class="modal-backdrop fade in"></div>');
    mask.css("z-index", zIndex);

    function getTemplate() {
        var dialogTpl;
        var defer = $q.defer();
        if (dialogTpl) {
            defer.resolve(dialogTpl);
        } else {
            dialogTpl = document.getElementById("alertTpl").innerHTML;
            defer.resolve(dialogTpl);
        }
        return defer.promise;
    }

    var service = {
        alert: function (param) {
            var defer = $q.defer();

            getTemplate().then(function (dialogTpl) {
                var dialog;
                dialogCounter++;

                if (dialogCounter == 1) {
                    $document.find("body").append(mask);
                }

                var data = $rootScope.$new();
                angular.extend(data, param);

                data.ok = function () {
                    service.dismiss(dialog);
                    defer.resolve("ok");
                };
                data.close = function () {
                    service.dismiss(dialog);
                    defer.resolve("ok");
                };

                dialog = $compile(angular.element(dialogTpl))(data);

                $document.find("body").append(dialog);
                dialog.css("display", "block");
                dialog.css("z-index", zIndex + dialogCounter);

                dialogArr.push(dialog);
            });

            return defer.promise;
        },
        confirm: function (param) {
            var defer = $q.defer();

            getTemplate().then(function (dialogTpl) {
                var dialog;
                dialogCounter++;

                if (dialogCounter == 1) {
                    $document.find("body").append(mask);
                }

                var data = $rootScope.$new();
                angular.extend(data, param);

                data.ok = function () {
                    service.dismiss(dialog);
                    defer.resolve("ok");
                };
                data.cancel = function () {
                    service.dismiss(dialog);
                    defer.reject("cancel");
                };
                data.close = function () {
                    service.dismiss(dialog);
                    defer.reject("cancel");
                };

                dialog = $compile(dialogTpl)(data);

                $document.find("body").append(dialog);
                dialog.css("display", "block");
                dialog.css("z-index", zIndex + dialogCounter);

                dialogArr.push(dialog);
            });

            return defer.promise;
        },
        dismiss: function (dialog) {
            dialogCounter--;
            dialog.remove();

            if (dialogCounter == 0) {
                mask.remove();
            }

            for (var i = 0; i < dialogArr.length; i++) {
                if (dialogArr[i] == dialog) {
                    dialogArr.splice(i, 1);
                    break;
                }
            }
        },
        dismissAll: function () {
            while (dialogArr.length > 0) {
                this.dismiss(dialogArr[0]);
            }
        }
    };

    return service;
}]);