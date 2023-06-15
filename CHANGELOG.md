# Changelog
## [3.0] - 2023-06-10

[Full Changelog](https://github.com/borecjeborec1/LepikJS/commits/main)

##### Implemented enhancements:
-  upgraded lepikevents to v2.0+ ([#d71a631](https://github.com/borecjeborec1/LepikJS/commit/d71a6313e270d96fa6b5153bf378a8bdf33c59b2))
-  minimize window ([#9cb448c](https://github.com/borecjeborec1/LepikJS/commit/9cb448c4e651012ad71f13b9cc423e43b9693e10))
-  setActiveWindow method ([#7cd3529](https://github.com/borecjeborec1/LepikJS/commit/7cd3529fb8f79dbcc6c8435bbfa38b1e06e3301d))
-  delay functionality ([#c576ed3](https://github.com/borecjeborec1/LepikJS/commit/c576ed3e53bb839e3e2a85a7eb270178ce36f313)) 
-  copy and paste methods implementation ([#8240475](https://github.com/borecjeborec1/LepikJS/commit/82404757db63d202bd617728ee1319b49c86fc6b)) 
-  getActiveWindowId function implementation UNIX/WINDOWS ([#c47930c](https://github.com/borecjeborec1/LepikJS/commit/c47930c164bc1afc0089f6215f1c4d81c6009e37)) 
-  getScreenSize function implementation UNIX/WINDOWS ([#2f5bc79](https://github.com/borecjeborec1/LepikJS/commit/2f5bc792a34e867b964b486e2314e2010b0b007d)) 
-  v3.0.0 Does not rely on python anymore ([#3d5dc97](https://github.com/Borecjeborec1/LepikJS/commit/3d5dc97f1f5fb773054864fb02e586c8a30793b5)) 
-  v3.0.0 Uses powershell scripts on windows and xdotool on linux machines ([#3d5dc97](https://github.com/Borecjeborec1/LepikJS/commit/3d5dc97f1f5fb773054864fb02e586c8a30793b5)) 

##### Fixed bugs:
-  fixed the on listeners ([#a23e236](https://github.com/borecjeborec1/LepikJS/commit/a23e2369fdd173929512e957e52f17b30f87d44f))
-  removed misconception of windowId and windowHandle ([#aaa3922](https://github.com/borecjeborec1/LepikJS/commit/aaa39226e56ea53a3ac5db9d1111e6cbd748042f))
-  Fixed wrong content in changelog ([#fd468c0](https://github.com/borecjeborec1/LepikJS/commit/fd468c071040ab1a92eb2586bcd85594b9078cde))
-  Fixed bug where some mouse controlling methods didn't work on certain linux distribuitions. [Issue #10](https://github.com/Borecjeborec1/LepikJS/issues/10). Because of xdotool all methods rely on the X11 . ([#3d5dc97](https://github.com/Borecjeborec1/LepikJS/commit/3d5dc97f1f5fb773054864fb02e586c8a30793b5)) 
-  Fixed bug where bundled applications didn't work because they required python's bundled exe.  ([#3d5dc97](https://github.com/Borecjeborec1/LepikJS/commit/3d5dc97f1f5fb773054864fb02e586c8a30793b5)) 

## [2.1.10] - 2023-05-26

[Full Changelog](https://github.com/borecjeborec1/LepikJS/commits/main)

##### Implemented enhancements:
-  created documented tests ([#5cba9b5](https://github.com/borecjeborec1/LepikJS/commit/5cba9b52cc8c15acf8f220ca7c6b095461d2f170)) 

##### Fixed bugs:


## [2.1.1] - 2015-10-06

*[Full Changelog](https://github.com/Borecjeborec1/LepikJS/commits/main)*

##### Implemented enhancements:

- Added Compatibility for more linux package managers.
- Added *[CHANGELOG.md](CHANGELOG.md)*.

##### Fixed bugs:

- Ignored pycache
- Fixed issue with min node version required was higher than needed


##### Merged pull requests:
