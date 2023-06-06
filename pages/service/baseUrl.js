let server = "https://www.chavefun.work"
let servicePath = "/WebService.asmx"

// #ifdef APP-PLUS 
server = "https://www.chavefun.work"
// #endif
// #ifdef H5
//server = "http://localhost:1060"
server = "https://www.chavefun.work"
// #endif
// #ifdef MP
server = "https://www.chavefun.work"
// #endif

export {
	server,
	servicePath,
}
