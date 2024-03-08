function display(display){
    if(display == 'weapons'){
        weapons.style.display  = 'grid';
        animals.style.display  = 'none';
        bweapons.style.background = '#ff9900';
        banimals.style.background = '';
    }else if(display == 'animals'){
        weapons.style.display  = 'none';
        animals.style.display  = 'grid';
        banimals.style.background = '#ff9900';
        bweapons.style.background = '';
    }
    restart();
};