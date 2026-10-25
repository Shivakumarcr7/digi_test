export function initPlayerAvatar(scene, startPos) {
    const loader = new THREE.GLTFLoader();
    const bones = {};
    const wrapper = new THREE.Group();
    wrapper.position.copy(startPos);
    scene.add(wrapper);

    loader.load('avatar.glb', (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Map the exact Avaturn bone structure
        bones.leftArm = model.getObjectByName('LeftArm');
        bones.rightArm = model.getObjectByName('RightArm');
        bones.leftLeg = model.getObjectByName('LeftUpLeg');
        bones.rightLeg = model.getObjectByName('RightUpLeg');

        // Relax arms from the default T-Pose
        if (bones.leftArm) bones.leftArm.rotation.z = -1.15;
        if (bones.rightArm) bones.rightArm.rotation.z = 1.15;

        wrapper.add(model);
        console.log("✅ Custom .glb Avatar Loaded");
    });

    return {
        wrapper: wrapper,
        bones: bones,
        animateWalk: (time, isMoving) => {
            if (isMoving && bones.leftLeg) {
                bones.leftLeg.rotation.x = Math.sin(time * 10) * 0.5;
                bones.rightLeg.rotation.x = -Math.sin(time * 10) * 0.5;
                bones.leftArm.rotation.x = -Math.sin(time * 10) * 0.5;
                bones.rightArm.rotation.x = Math.sin(time * 10) * 0.5;
            } else if (bones.leftLeg) {
                bones.leftLeg.rotation.x = 0;
                bones.rightLeg.rotation.x = 0;
                bones.leftArm.rotation.x = 0;
                bones.rightArm.rotation.x = 0;
            }
        }
    };
}
