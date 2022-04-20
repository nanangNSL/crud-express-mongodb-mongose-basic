// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const pijarcampController = require("/Users/user.N4N4NGK/Documents/crud-pijar/mypijar/controller/pijarcampController");

// endpoint pijarcamp
router.get("/", pijarcampController.viewPijarcamp); // Untuk view
router.post("/", pijarcampController.addPijarcamp); // data pijarcamp
router.put("/", pijarcampController.editPijarcamp);
router.delete("/:id", pijarcampController.deletePijarcamp);
// Lalu export routernya
module.exports = router;