FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)
FilePond.setOptions({
    stylePanelAspectRatio: 350/250,
    imageResizeTargetWidth:250,
    imageResizeTargetHeight:350
})
FilePond.parse(document.body)