# @ninjajs/event-bus-local

## 1.9.8

### Patch Changes

- [#6218](https://github.com/ninjajs/ninja/pull/6218) [`884428a1b`](https://github.com/ninjajs/ninja/commit/884428a1b573e499d7659aefed639bf797147428) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Feat: Event Aggregator

- Updated dependencies [[`12054f5c0`](https://github.com/ninjajs/ninja/commit/12054f5c01915899223ddc6da734151b31fbb23b), [`3db2f95e65`](https://github.com/ninjajs/ninja/commit/3db2f95e65909f4fff432990b48be74509052e83), [`96ba49329`](https://github.com/ninjajs/ninja/commit/96ba49329b6b05922c90f0c55f16455cb40aa5ca), [`45134e4d1`](https://github.com/ninjajs/ninja/commit/45134e4d11cfcdc08dbd10aae687bfbe9e848ab9), [`884428a1b`](https://github.com/ninjajs/ninja/commit/884428a1b573e499d7659aefed639bf797147428), [`882aa549b`](https://github.com/ninjajs/ninja/commit/882aa549bdcc6f378934eab2a7c485df354f46aa)]:
  - @ninjajs/utils@1.11.5
  - @ninjajs/modules-sdk@1.12.8

## 1.9.7

### Patch Changes

- [#5468](https://github.com/ninjajs/ninja/pull/5468) [`a45da9215`](https://github.com/ninjajs/ninja/commit/a45da9215d2a7834c368037726aaa3961caadaf9) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(ninja, modules-sdk, modules): Module loading was missing the expected dependencies and remote query reference fix

- Updated dependencies [[`a45da9215`](https://github.com/ninjajs/ninja/commit/a45da9215d2a7834c368037726aaa3961caadaf9)]:
  - @ninjajs/modules-sdk@1.12.2

## 1.9.6

### Patch Changes

- [#4420](https://github.com/ninjajs/ninja/pull/4420) [`6f1fa244f`](https://github.com/ninjajs/ninja/commit/6f1fa244fa47d4ecdaa7363483bd7da555dbbf32) Thanks [@adrien2p](https://github.com/adrien2p)! - chore(ninja-cli): Cleanup plugin setup + include Logger type update which is used across multiple packages

- Updated dependencies [[`499c3478c`](https://github.com/ninjajs/ninja/commit/499c3478c910c8b922a15cc6f4d9fbad122a347f), [`9dcdc0041`](https://github.com/ninjajs/ninja/commit/9dcdc0041a2b08cc0723343dd8d9127d9977b086), [`9760d4a96`](https://github.com/ninjajs/ninja/commit/9760d4a96c27f6f89a8c3f3b6e73b17547f97f2a)]:
  - @ninjajs/utils@1.9.2

## 1.9.5

### Patch Changes

- [#4276](https://github.com/ninjajs/ninja/pull/4276) [`afd1b67f1`](https://github.com/ninjajs/ninja/commit/afd1b67f1c7de8cf07fd9fcbdde599a37914e9b5) Thanks [@olivermrbl](https://github.com/olivermrbl)! - chore: Use caret range

- Updated dependencies [[`f98ba5bde`](https://github.com/ninjajs/ninja/commit/f98ba5bde83ba785eead31b0c9eb9f135d664178), [`14c0f62f8`](https://github.com/ninjajs/ninja/commit/14c0f62f84704a4c87beff3daaff60a52f5c88b8)]:
  - @ninjajs/utils@1.9.1
  - @ninjajs/modules-sdk@1.8.8

## 1.9.4

### Patch Changes

- Updated dependencies [[`a91987fab`](https://github.com/ninjajs/ninja/commit/a91987fab33745f9864eab21bd1c27e8e3e24571), [`e73c3e51c`](https://github.com/ninjajs/ninja/commit/e73c3e51c9cd192eeae7a57b24b07bd466214145), [`db4199530`](https://github.com/ninjajs/ninja/commit/db419953075e0907b8c4d27ab5188e9bd3e3d72b), [`c0e527d6e`](https://github.com/ninjajs/ninja/commit/c0e527d6e0a67d0c53577a0b9c3d16ee8dc5740f)]:
  - @ninjajs/utils@1.9.0
  - @ninjajs/modules-sdk@1.8.7

## 1.9.3

### Patch Changes

- Updated dependencies [[`cdbac2c84`](https://github.com/ninjajs/ninja/commit/cdbac2c8403a3c15c0e11993f6b7dab268fa5c08), [`6511959e2`](https://github.com/ninjajs/ninja/commit/6511959e23177f3b4831915db0e8e788bc9047fa)]:
  - @ninjajs/utils@1.8.5
  - @ninjajs/modules-sdk@1.8.6

## 1.9.2

### Patch Changes

- Updated dependencies [[`1ea57c3a6`](https://github.com/ninjajs/ninja/commit/1ea57c3a69a5377a8dd0821df819743ded4a222b)]:
  - @ninjajs/utils@1.8.4
  - @ninjajs/modules-sdk@1.8.5

## 1.9.1

### Patch Changes

- [#4002](https://github.com/ninjajs/ninja/pull/4002) [`0e488e71b`](https://github.com/ninjajs/ninja/commit/0e488e71b186f7d08b18c4c6ba409ef3cadb8152) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(ninja, event-bus-redis, event-bus-local): Revert retrieveSubscribers as the wildcard prevent us from filtering

- Updated dependencies [[`0e488e71b`](https://github.com/ninjajs/ninja/commit/0e488e71b186f7d08b18c4c6ba409ef3cadb8152), [`d539c6fee`](https://github.com/ninjajs/ninja/commit/d539c6feeba8ee431f9a655b6cd4e9102cba2b25)]:
  - @ninjajs/utils@1.8.3
  - @ninjajs/modules-sdk@1.8.4

## 1.9.0

### Minor Changes

- [#3835](https://github.com/ninjajs/ninja/pull/3835) [`af710f1b4`](https://github.com/ninjajs/ninja/commit/af710f1b48a4545a5064029a557013af34c4c100) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(ninja): Bulk create variant and pass transaction to the inventory service context methods

### Patch Changes

- Updated dependencies [[`af710f1b4`](https://github.com/ninjajs/ninja/commit/af710f1b48a4545a5064029a557013af34c4c100), [`491566df6`](https://github.com/ninjajs/ninja/commit/491566df6b7ced35f655f810961422945e10ecd0)]:
  - @ninjajs/utils@1.8.2
  - @ninjajs/modules-sdk@1.8.3

## 1.8.2

### Patch Changes

- Updated dependencies []:
  - @ninjajs/modules-sdk@1.8.2

## 1.8.1

### Patch Changes

- Updated dependencies [[`654a54622`](https://github.com/ninjajs/ninja/commit/654a54622303139e7180538bd686630ad9a46cfd), [`abdb74d99`](https://github.com/ninjajs/ninja/commit/abdb74d997f49f994bff49787a396179982843b0)]:
  - @ninjajs/utils@1.8.1
  - @ninjajs/modules-sdk@1.8.1

## 1.8.0

### Minor Changes

- [#2599](https://github.com/ninjajs/ninja/pull/2599) [`ef5ef9f5a`](https://github.com/ninjajs/ninja/commit/ef5ef9f5a26febf0b64d9981606c1e59999ca76e) Thanks [@olivermrbl](https://github.com/olivermrbl)! - feat(ninja,event-bus-local,event-bus-redis): Event Bus module (Redis + Local)

### Patch Changes

- [#3685](https://github.com/ninjajs/ninja/pull/3685) [`8ddb3952c`](https://github.com/ninjajs/ninja/commit/8ddb3952c045e6c05c8d0f6922f0d4ba30cf3bd4) Thanks [@olivermrbl](https://github.com/olivermrbl)! - chore: Fix RC package versions

- [#3649](https://github.com/ninjajs/ninja/pull/3649) [`bd12a9508`](https://github.com/ninjajs/ninja/commit/bd12a95083b69a70b83ad38578c5a68738c41b2b) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Export initialize method for all modules

- [#3575](https://github.com/ninjajs/ninja/pull/3575) [`4a7bdc917`](https://github.com/ninjajs/ninja/commit/4a7bdc917ac17d1f8e0749c033f8816ecb0c10b5) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(event-bus-local): Error handling

- Updated dependencies [[`8ddb3952c`](https://github.com/ninjajs/ninja/commit/8ddb3952c045e6c05c8d0f6922f0d4ba30cf3bd4), [`a0c919a8d`](https://github.com/ninjajs/ninja/commit/a0c919a8d01ca5edf62336de48e9a112e3822f38), [`55e94d0b4`](https://github.com/ninjajs/ninja/commit/55e94d0b45776776639d3970d4264b8f5c5385dd), [`74bc4b16a`](https://github.com/ninjajs/ninja/commit/74bc4b16a07f78668003ca930bf2a0d928897ceb), [`bd12a9508`](https://github.com/ninjajs/ninja/commit/bd12a95083b69a70b83ad38578c5a68738c41b2b), [`77d46220c`](https://github.com/ninjajs/ninja/commit/77d46220c23bfe19e575cbc445874eb6c22f3c73), [`bca1f80dd`](https://github.com/ninjajs/ninja/commit/bca1f80dd501d878455e1ad4f5091cf20ef900ea), [`271844aed`](https://github.com/ninjajs/ninja/commit/271844aedbe45c369e188b5d06458dbd6984cd39), [`4e9d257d3`](https://github.com/ninjajs/ninja/commit/4e9d257d3bf76703ef5be8ca054cc9f0f7339def)]:
  - @ninjajs/modules-sdk@1.8.0
  - @ninjajs/utils@1.8.0

## 1.8.0-rc.4

### Patch Changes

- [#3649](https://github.com/ninjajs/ninja/pull/3649) [`bd12a9508`](https://github.com/ninjajs/ninja/commit/bd12a95083b69a70b83ad38578c5a68738c41b2b) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Export initialize method for all modules

- Updated dependencies [[`a0c919a8d`](https://github.com/ninjajs/ninja/commit/a0c919a8d01ca5edf62336de48e9a112e3822f38), [`bd12a9508`](https://github.com/ninjajs/ninja/commit/bd12a95083b69a70b83ad38578c5a68738c41b2b)]:
  - @ninjajs/utils@0.0.2-rc.2
  - @ninjajs/modules-sdk@0.1.0-rc.4

## 1.8.0-rc.3

### Patch Changes

- Updated dependencies [[`55e94d0b4`](https://github.com/ninjajs/ninja/commit/55e94d0b45776776639d3970d4264b8f5c5385dd)]:
  - @ninjajs/modules-sdk@0.1.0-rc.3

## 1.8.0-rc.2

### Patch Changes

- chore: Fix RC package versions

- Updated dependencies []:
  - @ninjajs/modules-sdk@0.1.0-rc.2
  - @ninjajs/utils@0.0.2-rc.1

## 1.8.0-rc.1

### Patch Changes

- [#3575](https://github.com/ninjajs/ninja/pull/3575) [`4a7bdc917`](https://github.com/ninjajs/ninja/commit/4a7bdc917ac17d1f8e0749c033f8816ecb0c10b5) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(event-bus-local): Error handling

- Updated dependencies [[`bca1f80dd`](https://github.com/ninjajs/ninja/commit/bca1f80dd501d878455e1ad4f5091cf20ef900ea)]:
  - @ninjajs/modules-sdk@0.1.0-rc.1

## 1.8.0-rc.0

### Minor Changes

- [#2599](https://github.com/ninjajs/ninja/pull/2599) [`ef5ef9f5a`](https://github.com/ninjajs/ninja/commit/ef5ef9f5a26febf0b64d9981606c1e59999ca76e) Thanks [@olivermrbl](https://github.com/olivermrbl)! - feat(ninja,event-bus-local,event-bus-redis): Event Bus module (Redis + Local)

### Patch Changes

- Updated dependencies [[`74bc4b16a`](https://github.com/ninjajs/ninja/commit/74bc4b16a07f78668003ca930bf2a0d928897ceb), [`77d46220c`](https://github.com/ninjajs/ninja/commit/77d46220c23bfe19e575cbc445874eb6c22f3c73), [`271844aed`](https://github.com/ninjajs/ninja/commit/271844aedbe45c369e188b5d06458dbd6984cd39), [`4e9d257d3`](https://github.com/ninjajs/ninja/commit/4e9d257d3bf76703ef5be8ca054cc9f0f7339def)]:
  - @ninjajs/utils@0.0.2-rc.0
  - @ninjajs/modules-sdk@0.1.0-rc.0
