export const urlExpression = (target : HTMLElement): string => {
    let urlExp = /"(.+)"/;

    let url = urlExp.exec(target.style.backgroundImage);

    if (!url) throw new Error('No url found');

    return url[1];
}