const reqCommon = require.context("@/assets/common/icon", false, /\.svg$/);
const reqAvatar = require.context("@/assets/common/avatar", false, /\.svg$/);
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
requireAll(reqCommon);
requireAll(reqAvatar)
