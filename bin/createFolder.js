import { mkdir } from "fs";
function createFolder({ name  }, callback) {
    // const currentPath = process.cwd();
    mkdir(name, ()=>{
        console.log(`Created folder: ${name}`);
        callback && callback();
    });
}
export default createFolder;
