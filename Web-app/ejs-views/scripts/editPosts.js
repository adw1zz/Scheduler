document.addEventListener('click',(e) => {
    const id = e.target?.dataset?.id || null;
    if (id){
        fetch(`/index/${id}`,{
            method: 'DELETE',
        }).then(window.location.reload());
    }
});