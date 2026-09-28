import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Set<Integer> set = new HashSet<>();
        
        while (sc.hasNext()) {
            String s = sc.next().trim();
            if (!s.isEmpty() && Integer.parseInt(s)) {
                set.add(Integer.parseInt(s));
            }
        }
        
        int count = 0;
        long sum = 0L;
        for (Integer i : set) {
            count++;
            sum += i.longValue();
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static class HashSet {} // Dummy inner class to satisfy unused import warning if needed, but here we just use java.util.Set directly. Actually, simpler approach below:
}
