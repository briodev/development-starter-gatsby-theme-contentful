module.exports = themeOptions => {
    const basePath = themeOptions.basePath || `/images`
    const contentful = themeOptions.contentful

    return {
        basePath,
        contentful
    }
}