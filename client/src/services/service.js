import http from "../http-common";

class DataService {
    schools() {
        return http.get("/api/submission/");
    }
    school(id) {
        return http.get("/api/submission/" + id);
    }
    imgUpload(data) {
        return http.post("/api/submission/img-upload", data);
    }
    create(form) {
        return http.post("/api/submission/create", form);
    }
    edit(form) {
        return http.post("/api/submission/edit/" + form._id, form);
    }
}

export default new DataService();