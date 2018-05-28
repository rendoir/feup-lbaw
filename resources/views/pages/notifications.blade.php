@extends('layouts.app')

@section('title', 'Notifications')

@section('content')

@foreach($notifications as $notification)
{{$notification}}
@endforeach
@endsection