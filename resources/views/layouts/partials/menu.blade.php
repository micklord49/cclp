<nav class="navbar navbar-expand-lg {{$Data->menu->Class}} fixed-top">
    <a class="navbar-brand" href="#"><img src="/images/cclp.png"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                @foreach($Data->menu->Menu as $menu)
                    @if(isset($menu->SubItems))
                        <li class="nav-item dropdown" >
                            <a href="#" class="nav-link dropdown-toggle" id="menu{{$menu->jsid}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ $menu->Title }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="menu{{$menu->jsid}}">
                            @foreach($menu->SubItems as $sub)
                                @isset($sub->Title)
                                    @if(isset($sub->SubItems))
                                            <a href="#" class="dropdown-item dropdown-toggle" id="menu{{$sub->jsid}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ $sub->Title }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="menu{{$sub->jsid}}">
                                            @foreach($sub->SubItems as $subsub)
                                                @isset($subsub->Title)
                                                    <a href="{{ $subsub->URL }}" class="dropdown-item">{{ $subsub->Title }}</a>
                                                @endisset
                                            @endforeach
                                            </div>
                                    @else
                                        <a href="{{ $sub->URL }}" class="dropdown-item">{{ $sub->Title }}</a>
                                    @endif
                                @endisset
                            @endforeach
                            </div>
                        </li>
                    @else
                        <li class="nav-item">
                            <a class="nav-link" href="{{ $menu->URL }}">{{ $menu->Title }}</a>
                        </li>
                    @endif
                @endforeach
            </ul>
    </div>
</nav>
