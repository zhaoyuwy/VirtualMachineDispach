define(["can/util/fixture/fixture", "tiny-lib/underscore"], function (fixture, _) {
    var user = {
        "id": "266",
        "name": "ops_user_fixture",
        "roleIds": [
            "27",
            "28",
            "29",
            "30"
        ],
        "roleNames": [
            "ops_role_uba",
            "ops_role_oim",
            "ops_role_admin",
            "ops_role_opsuba"
        ],
        "region":""
    };

    fixture({

        "GET /me": function (original, response) {
            response(200, "success", user, {});
        },
        "GET /rest/silvan/rest/v1.0/test/endpoints": function (original, response) {
            response(200, "success", endpoints, {});
        }
    });

    return fixture;
});