export const handleLogout = async () => {
    const token = localStorage.getItem("access")
    //console.log(token)
    localStorage.clear()
      alert('로그아웃 되었습니다.');
      window.location.href = "/";
    // try {
    //   await axios.post('https://findit.p-e.kr:8443/api/users/logout', {}, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   localStorage.removeItem('token');
    //   alert('로그아웃 되었습니다.');
    //   // 사용자 리다이렉션 또는 UI 업데이트
    // } catch (error) {
    //   console.error("로그아웃 실패:", error);
    // }
  };