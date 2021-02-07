const req = require.context("@/assets/common/icon", false, /\.svg$/);
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
requireAll(req);
