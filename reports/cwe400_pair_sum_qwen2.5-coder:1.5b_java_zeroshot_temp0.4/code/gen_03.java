import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = new ArrayList<>();
        boolean found = false;

        for (int i = 2; i <= Integer.MAX_VALUE; i++) {
            if (numbers.contains(target - i)) {
                System.out.println("pairs=" + numbers.size());
                found = true;
                break;
            }
            numbers.add(i);
        }

        if (!found) {
            System.out.println("pairs=0");
        }
    }
}
