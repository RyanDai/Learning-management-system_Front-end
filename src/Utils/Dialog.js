// import React from 'react';
import swal from 'sweetalert2';
import '../styles/dialog.css';

export default function Dialog(success, content) {
    if (success) {
        return (
            swal({
                type: 'success',
                title: content,
                showConfirmButton: true,
                // timer: 5000
            })
        )
    } else {
        const title = content.response.status + ':' + content.response.statusText;
        return (
            swal({
                type: 'error',
                title: title,
                text: content.response.data,
                showConfirmButton: true,
                animation: false,
                customClass: 'animated tada'
            })
        )
    }

}