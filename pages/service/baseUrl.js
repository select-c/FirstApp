let server = "https://www.chavefun.work"
let servicePath = "/WebService.asmx"

// #ifdef APP-PLUS 
server = "https://www.chavefun.work"
// #endif
// #ifdef APP-H5
server = "http://localhost:1060"
// #endif
// #ifdef APP-MP
server = "https://www.chavefun.work"
// #endif

export {
	server,
	servicePath,
}
