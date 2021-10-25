prefix = "http://localhost:8080/"
function getBackend() {
    const rbs = document.querySelectorAll('input[name="backend"]');
    for (const rb of rbs) {
        if (rb.checked) {
            return rb.value
        }
    }
}
function getHash() {
    input_node = document.getElementById("text_input")
    output_node = document.getElementById("hash_container")

    let text = input_node.value
    if (text.length < 8) {
        alert(text + " is too small (at least 8 needed)")
        return
    }
    fetch(`${prefix}${getBackend()}/sha256`, {
        method: "POST",
        body: JSON.stringify({
            text
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res=>res.json())
        .then(res=>output_node.innerHTML=res.hash)
}
function getText() {
    input_node = document.getElementById("hash_input")
    output_node = document.getElementById("text_container")
    let hash = input_node.value
    fetch(`${prefix}${getBackend()}/sha256?hash=${encodeURIComponent(hash, {method: "GET"})}`)
        .then(res=> {
            if (res.status != 200)
                throw "not successfull!"
            return res
        })
        .then(res=>res.json()).catch(res=>{ return {text: "no match!"}})
        .then(res=>output_node.innerHTML=res.text)
}