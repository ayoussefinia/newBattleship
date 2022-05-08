let promise = new Promise((resolve, reject)=>{
    resolve('hello')
})

async function run(){
    console.log(await promise)
}

run();