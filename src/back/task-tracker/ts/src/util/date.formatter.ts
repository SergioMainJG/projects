export class Formatter {
    static formatDate( value: Date ): string{
        const date = new Date( value );
        return Intl.DateTimeFormat('en-EN',{
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format( date );
    };
};