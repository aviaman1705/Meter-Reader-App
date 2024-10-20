import Swal from "sweetalert2";

export default function alert(text: string) {

    Swal.fire({
        icon: "error",
        title: "אופס...",
        text: `${text}`,
        showConfirmButton: false,
    });
}