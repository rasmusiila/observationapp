import {FormControl} from '@angular/forms';

export function requiredFileType(fileTypes: string[]) {
    return (control: FormControl) => {
        const file = control.value;
        if (file) {
            if (!fileTypes.map(fileType => 'image/' + fileType).includes(file.type)) {
                return {
                    requiredFileType: true
                };
            }
            return null;
        }
        return null;
    };
}
