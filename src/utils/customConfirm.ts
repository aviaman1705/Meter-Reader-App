import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = "האם אתה בטוח ?",
    confirmButtonText: string = "מחיקה"
) {

    Swal.fire({
        title,
        confirmButtonText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ביטול'
    }).then(result => {
        if (result.isConfirmed) {
            onConfirm();
        }
    })
}